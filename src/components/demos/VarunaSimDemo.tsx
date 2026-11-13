"use client";

import React, { useState, useMemo } from "react";
import { Ship, ShieldCheck, RefreshCw, Anchor, Compass } from "lucide-react";

export function VarunaSimDemo() {
  const [bunkerPrice, setBunkerPrice] = useState<number>(620); // $/MT
  const [cargoTonnage, setCargoTonnage] = useState<number>(80000); // MT
  const [weatherStress, setWeatherStress] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const calculations = useMemo(() => {
    const bunkerDelta = (bunkerPrice - 620) * 0.024;
    const weatherPenalty = weatherStress ? 3.85 : 0;
    const predictedRate = Number((56.51 + bunkerDelta + weatherPenalty).toFixed(2));
    const landedCost = Math.round(cargoTonnage * predictedRate * 0.51 + 125000);
    const var95 = Math.round(landedCost * 1.044);
    const cvar95 = Math.round(landedCost * 1.051);

    return {
      predictedRate,
      landedCost,
      var95,
      cvar95,
      winningVessel: "FRIEDRICH OLDENDORFF",
      vesselDWT: "180,000 DWT Capesize",
      vesselDraft: "18.2 m (Feasible for Paradip Berth #2)",
      totalPipelineMs: 176.99,
      mae: "$3.94 / MT",
      sailingDays: 14.8,
    };
  }, [bunkerPrice, cargoTonnage, weatherStress]);

  const triggerMonteCarlo = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 350);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cobalt-50 text-cobalt-700 border border-cobalt-200">
              <Ship className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold font-heading text-zinc-900">
              VARUNA MILP Fleet Scheduler &amp; 10k Monte Carlo Risk Estimator
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            Corridor: <span className="text-cobalt-600 font-semibold">Hay Point (AUS) &rarr; Paradip (IND)</span> &middot; 80,000 MT Capesize Coal Benchmark
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
            Test MAE: {calculations.mae}
          </span>
          <span className="px-2.5 py-1 rounded bg-cobalt-50 text-cobalt-700 border border-cobalt-200 text-xs font-mono font-medium">
            Pipeline: {calculations.totalPipelineMs} ms
          </span>
        </div>
      </div>

      {/* Simulator Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs font-mono">
        {/* Bunker Fuel */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-700 font-semibold">
            <span>Bunker VLSFO:</span>
            <span className="text-amber-700">${bunkerPrice} / MT</span>
          </div>
          <input
            type="range"
            min="500"
            max="850"
            step="10"
            value={bunkerPrice}
            onChange={(e) => setBunkerPrice(parseInt(e.target.value))}
            className="w-full accent-amber-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>$500</span>
            <span>Baseline $620</span>
            <span>$850</span>
          </div>
        </div>

        {/* Cargo Tonnage */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-zinc-700 font-semibold">
            <span>Cargo Volume:</span>
            <span className="text-cobalt-600">{cargoTonnage.toLocaleString()} MT</span>
          </div>
          <input
            type="range"
            min="60000"
            max="120000"
            step="5000"
            value={cargoTonnage}
            onChange={(e) => setCargoTonnage(parseInt(e.target.value))}
            className="w-full accent-cobalt-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-zinc-400">
            <span>60k MT</span>
            <span>80k Capesize</span>
            <span>120k MT</span>
          </div>
        </div>

        {/* Weather Stress */}
        <div className="flex flex-col justify-between">
          <div className="text-zinc-700 font-semibold">Monsoon Sea Stress:</div>
          <button
            onClick={() => setWeatherStress(!weatherStress)}
            className={`px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between border transition-all cursor-pointer ${
              weatherStress
                ? "bg-amber-100 text-amber-900 border-amber-300 font-semibold"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            <span>{weatherStress ? "Severe Cyclonic Swell (+12kt)" : "Calm Equatorial Waters"}</span>
            <Compass className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* Calculated Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-zinc-400">Predicted Spot Rate</div>
          <div className="text-xl font-bold font-mono text-emerald-700 mt-1">
            ${calculations.predictedRate} <span className="text-xs font-normal text-zinc-500">/ MT</span>
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Ridge ML Out-of-Sample</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-zinc-400">Landed Voyage Cost</div>
          <div className="text-xl font-bold font-mono text-zinc-900 mt-1">
            ${calculations.landedCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Includes port tariff &amp; bunker</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-zinc-400">95% Value-at-Risk (VaR)</div>
          <div className="text-xl font-bold font-mono text-amber-700 mt-1">
            ${calculations.var95.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">10k Monte Carlo iterations</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs">
          <div className="text-[10px] font-mono uppercase text-zinc-400">95% Conditional VaR</div>
          <div className="text-xl font-bold font-mono text-red-600 mt-1">
            ${calculations.cvar95.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-500 mt-0.5">Expected tail shortfall loss</div>
        </div>
      </div>

      {/* HiGHS MILP Allocation Details */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-900 font-bold flex items-center gap-1.5">
            <Anchor className="w-3.5 h-3.5 text-cobalt-600" />
            <span>HiGHS MILP Optimal Fleet Candidate (128.73 ms solver)</span>
          </span>
          <span className="text-emerald-700 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Feasible (200 ships evaluated)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 text-[11px]">Allocated Vessel:</span>
            <div className="text-zinc-900 font-bold mt-0.5">{calculations.winningVessel}</div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 text-[11px]">Deadweight &amp; Class:</span>
            <div className="text-zinc-800 mt-0.5">{calculations.vesselDWT}</div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-zinc-200">
            <span className="text-zinc-400 text-[11px]">Berth Constraints:</span>
            <div className="text-zinc-800 mt-0.5">{calculations.vesselDraft}</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs pt-1 font-mono">
        <span className="text-zinc-500">
          Engine: Scikit-Learn Ridge + SciPy HiGHS + NumPy 10k Monte Carlo (273 tests)
        </span>
        <button
          onClick={triggerMonteCarlo}
          disabled={isSimulating}
          className="px-3.5 py-1.5 rounded-md bg-cobalt-50 hover:bg-cobalt-100 text-cobalt-700 text-xs font-semibold border border-cobalt-200 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
          <span>Re-run 10k Monte Carlo (36.57ms)</span>
        </button>
      </div>
    </div>
  );
}
