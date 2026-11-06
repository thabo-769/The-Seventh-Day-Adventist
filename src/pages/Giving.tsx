import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { Heart, ShieldCheck, CheckCircle2, Info, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Giving: React.FC = () => {
  const { settings } = useChurch();
  const [titheAmount, setTitheAmount] = useState<string>('100');
  const [localBudget, setLocalBudget] = useState<string>('50');
  const [worldMission, setWorldMission] = useState<string>('25');
  const [communityRelief, setCommunityRelief] = useState<string>('25');
  const [simulatedComplete, setSimulatedComplete] = useState<boolean>(false);

  const total =
    (parseFloat(titheAmount) || 0) +
    (parseFloat(localBudget) || 0) +
    (parseFloat(worldMission) || 0) +
    (parseFloat(communityRelief) || 0);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatedComplete(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/giving_stewardship_bg_1793890663902.jpg"
            alt="Christian Stewardship and Giving"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Christian Stewardship
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Together, We Can Make a Difference.
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Returning God’s tithe and voluntary offerings is an act of grateful worship, acknowledging that everything we possess belongs to the Creator.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482] block mb-2">
                  Biblical Stewardship
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#080B10] mb-4">
                  How Your Giving Impacts God’s Kingdom
                </h2>
                <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    In the Seventh-day Adventist Church, stewardship is more than financial support; it is a spiritual relationship of trust with God.
                  </p>
                  <p>
                    <strong>The Tithe (10%):</strong> According to Scripture (Malachi 3:10; Leviticus 27:30), the tithe is holy to the Lord and is dedicated exclusively to the Gospel ministry—supporting pastors, evangelists, and front-line missionaries worldwide.
                  </p>
                  <p>
                    <strong>Free-Will Offerings:</strong> Unlike tithe, voluntary offerings directly support our local church operating expenses, building maintenance, Sabbath School supplies, Christian education subsidies, and local community pantry operations.
                  </p>
                </div>
              </div>

              {/* Official Giving Instructions from Settings */}
              <div className="p-6 rounded-2xl bg-[#F5F7F9] border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#005482]">
                  <Info className="w-4 h-4 text-[#005482]" />
                  <span>Approved Giving Methods & Instructions</span>
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">
                  {settings.givingInstructions}
                </p>
                <div className="pt-2 text-xs text-stone-500 italic">
                  Note: Official local church banking details and envelope codes can be verified with the church treasury board.
                </div>
              </div>

              {/* 3 Impact Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-stone-200 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#005482] mb-1">Worldwide Mission</div>
                  <p className="text-xs text-stone-600">Sending medical missionaries and evangelists to unreached populations.</p>
                </div>
                <div className="p-5 rounded-xl border border-stone-200 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#005482] mb-1">Local Ministry</div>
                  <p className="text-xs text-stone-600">Funding Sabbath services, children’s ministry, and community care.</p>
                </div>
                <div className="p-5 rounded-xl border border-stone-200 bg-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#005482] mb-1">Disaster Relief</div>
                  <p className="text-xs text-stone-600">Providing immediate humanitarian assistance via Adventist Community Services.</p>
                </div>
              </div>
            </div>

            {/* Right: Giving Envelope & Steward Calculator */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5F7F9] p-8 rounded-2xl border border-stone-200 shadow-md sticky top-28">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#005482]">
                    Tithe & Offering Envelope
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#005482]" />
                </div>

                <h3 className="text-xl font-bold font-serif text-[#080B10] mb-2">
                  Stewardship Calculator
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Plan your worship giving across church mission funds.
                </p>

                {simulatedComplete ? (
                  <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-center space-y-4">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">Plan Completed</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Your stewardship allocation of <strong className="font-mono text-sm">${total.toFixed(2)}</strong> has been prepared. You may submit this directly via official AdventistGiving online or through the local church envelope during divine worship.
                    </p>
                    <button
                      onClick={() => setSimulatedComplete(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#005482] bg-white border border-stone-200 rounded-lg hover:bg-stone-50"
                    >
                      Recalculate
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSimulate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        1. Tithe (Sacred to the Lord - 10%)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={titheAmount}
                          onChange={(e) => setTitheAmount(e.target.value)}
                          className="w-full pl-7 pr-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        2. Local Church Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={localBudget}
                          onChange={(e) => setLocalBudget(e.target.value)}
                          className="w-full pl-7 pr-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        3. World Mission & Evangelism
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={worldMission}
                          onChange={(e) => setWorldMission(e.target.value)}
                          className="w-full pl-7 pr-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-700 mb-1">
                        4. Community Services & Food Pantry
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400">$</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={communityRelief}
                          onChange={(e) => setCommunityRelief(e.target.value)}
                          className="w-full pl-7 pr-3.5 py-2 text-base bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-[#005482] font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-sm">
                      <span className="font-bold text-stone-800">Total Gift:</span>
                      <span className="font-bold text-lg font-mono text-[#005482]">${total.toFixed(2)}</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-base font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>Review Stewardship Plan</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
