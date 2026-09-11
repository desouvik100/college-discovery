"use client";

import { useState } from "react";
import PredictorForm from "@/components/predictor/PredictorForm";
import PredictionResults from "@/components/predictor/PredictionResults";
import { PredictionResponse } from "@/lib/types";

export default function PredictorPage() {
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          College Predictor
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Enter your entrance examination and All-India rank to evaluate institutional cutoff fit based on historical admission data.
        </p>
        <p className="text-[11px] text-slate-400 bg-slate-100/70 border border-slate-200 px-3 py-1.5 rounded">
          Note: Recommendations are calculated using deterministic cutoff distance against historical demonstration data in this catalog. Results provide comparative guidance and do not constitute an official allotment or guarantee.
        </p>
      </div>

      {/* Predictor Form */}
      <PredictorForm
        onPredict={setPredictions}
        onLoadingChange={setLoading}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 space-y-2">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-slate-900 border-t-transparent"></div>
          <p className="text-xs text-slate-500 font-medium">Evaluating rank against historical admission cutoffs...</p>
        </div>
      )}

      {/* Prediction Results */}
      {!loading && predictions && (
        <PredictionResults predictions={predictions} />
      )}
    </div>
  );
}
