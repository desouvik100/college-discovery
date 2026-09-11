"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { PredictionResponse } from "@/lib/types";

interface PredictorFormProps {
  onPredict: (predictions: PredictionResponse | null) => void;
  onLoadingChange: (loading: boolean) => void;
}

interface Exam {
  id: string;
  name: string;
  code: string;
  description: string;
}

export default function PredictorForm({ onPredict, onLoadingChange }: PredictorFormProps) {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examCode, setExamCode] = useState("");
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch("/api/exams");
      const data = await response.json();
      setExams(data.exams || []);
      if (data.exams?.length > 0) {
        setExamCode(data.exams[0].code);
      }
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    onPredict(null);

    if (!examCode || !rank) {
      setError("Please specify both the entrance exam and your All-India rank.");
      return;
    }

    const rankNum = parseInt(rank.replace(/,/g, ""), 10);
    if (isNaN(rankNum) || rankNum < 1) {
      setError("Please enter a valid positive rank integer.");
      return;
    }

    onLoadingChange(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examCode,
          rank: rankNum,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction request could not be completed.");
      }

      onPredict(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction request could not be completed.");
    } finally {
      onLoadingChange(false);
    }
  };

  const handleReset = () => {
    setRank("");
    setCategory("GENERAL");
    setError(null);
    onPredict(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
      <div className="pb-3 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">
          Rank Parameters
        </h2>
        <p className="text-xs text-slate-500">
          Provide your entrance exam, verified rank, and seat category to calculate historical cutoff fit.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Entrance Exam <span className="text-slate-400">*</span>
            </label>
            <Select
              value={examCode}
              onChange={(e) => setExamCode(e.target.value)}
              required
              className="text-xs h-9"
            >
              {exams.map((exam) => (
                <option key={exam.code} value={exam.code}>
                  {exam.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              All-India Rank <span className="text-slate-400">*</span>
            </label>
            <Input
              type="number"
              placeholder="e.g., 4200"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              min="1"
              max="2000000"
              required
              className="text-xs h-9 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Counseling Category
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-xs h-9"
            >
              <option value="GENERAL">General / Open</option>
              <option value="OBC">OBC-NCL</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="SC">Scheduled Caste (SC)</option>
              <option value="ST">Scheduled Tribe (ST)</option>
            </Select>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800">
            {error}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <Button type="submit" variant="primary" size="md">
            Evaluate Rank Fit
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={handleReset}>
            Reset Form
          </Button>
        </div>
      </form>
    </div>
  );
}
