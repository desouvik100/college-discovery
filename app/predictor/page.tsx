"use client";

import { useState } from "react";
import PredictorForm from "@/components/predictor/PredictorForm";
import PredictionResults from "@/components/predictor/PredictionResults";
import { PredictionResponse } from "@/lib/types";

export default function PredictorPage() {
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <header className="space-y-3">
        <h1 className="display-title">
          College Predictor
        </h1>
        <p className="body-text text-stone-600 max-w-2xl">
          Enter your entrance examination and All-India rank to evaluate institutional cutoff fit based on historical admission data.
        </p>
        <div className="p-4 surface-secondary border border-stone-200 rounded-lg">
          <p className="small-text text-stone-700">
            <span className="font-medium">Important:</span> Predictions are calculated using historical cutoff data from this catalog. Results provide comparative guidance and do not constitute official admission guarantees.
          </p>
        </div>
      </header>

      <PredictorForm
        onPredict={setPredictions}
        onLoadingChange={setLoading}
      />

      {loading && (
        <div className="text-center py-16 space-y-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-stone-300 border-t-stone-900"></div>
          <p className="body-text text-stone-600">Evaluating rank against historical admission cutoffs...</p>
        </div>
      )}

      {!loading && predictions && (
        <PredictionResults predictions={predictions} />
      )}
    </div>
  );
}
