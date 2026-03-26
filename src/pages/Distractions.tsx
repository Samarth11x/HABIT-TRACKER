import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Crosshair, Shield, Zap, AlertTriangle } from 'lucide-react';

export function Distractions() {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <Header title="Distraction Kill List" subtitle="Identify the enemy. Execute the protocol." />
      
      <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Distractions & Triggers */}
          <div className="space-y-6">
            <Card className="border-samarth-danger/30">
              <h3 className="text-base font-bold text-samarth-danger mb-4 flex items-center gap-2">
                <Crosshair className="w-5 h-5" /> My Biggest Distractions
              </h3>
              <ul className="space-y-3">
                <li className="p-3 bg-samarth-bg rounded border border-samarth-border text-samarth-text font-medium">Scrolling Instagram Reels</li>
                <li className="p-3 bg-samarth-bg rounded border border-samarth-border text-samarth-text font-medium">YouTube tangent watching</li>
                <li className="p-3 bg-samarth-bg rounded border border-samarth-border text-samarth-text font-medium">Afternoon sleepiness (3 PM - 6 PM)</li>
                <li className="p-3 bg-samarth-bg rounded border border-samarth-border text-samarth-text font-medium">Chart gazing outside setup window</li>
              </ul>
            </Card>

            <Card className="border-samarth-warning/30">
              <h3 className="text-base font-bold text-samarth-warning mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Trigger Situations
              </h3>
              <ul className="space-y-3">
                <li className="text-sm text-samarth-text font-medium flex gap-2 items-start"><span className="text-samarth-warning mt-1">•</span> Feeling bored during study blocks.</li>
                <li className="text-sm text-samarth-text font-medium flex gap-2 items-start"><span className="text-samarth-warning mt-1">•</span> FOMO after seeing someone else's P/L screenshot.</li>
                <li className="text-sm text-samarth-text font-medium flex gap-2 items-start"><span className="text-samarth-warning mt-1">•</span> Post-lunch lethargy.</li>
              </ul>
            </Card>
          </div>

          {/* Protocols & Replacements */}
          <div className="space-y-6">
            <Card className="border-samarth-success/30 bg-samarth-success/5">
              <h3 className="text-base font-bold text-samarth-success mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" /> Emergency Reset Protocol
              </h3>
              <p className="text-sm text-samarth-text mb-4 leading-relaxed font-medium">
                When feeling the urge to break discipline or succumb to a trigger, execute these immediate actions:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-samarth-bg rounded border border-samarth-border">
                  <span className="text-xl">💧</span>
                  <span className="text-sm font-bold text-samarth-text">Drink a full glass of water.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-samarth-bg rounded border border-samarth-border">
                  <span className="text-xl">💪</span>
                  <span className="text-sm font-bold text-samarth-text">Do 10 pushups immediately.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-samarth-bg rounded border border-samarth-border">
                  <span className="text-xl">🚶</span>
                  <span className="text-sm font-bold text-samarth-text">Walk away for 3 minutes. Leave the room.</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-samarth-bg rounded border border-samarth-border">
                  <span className="text-xl">📖</span>
                  <span className="text-sm font-bold text-samarth-text">Open Journal & Read Rules aloud.</span>
                </div>
              </div>
            </Card>

            <Card className="border-samarth-primary/30">
              <h3 className="text-base font-bold text-samarth-primary mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Replacement Actions
              </h3>
              <p className="text-sm text-samarth-textSecondary mb-4">
                Instead of doing nothing, do one tiny productive task.
              </p>
              <ul className="space-y-2 text-sm text-samarth-text font-medium list-disc pl-5">
                <li>Clean your immediate desk space.</li>
                <li>Write down one idea.</li>
                <li>Review a single flashcard or note.</li>
                <li>Stretch for 60 seconds.</li>
              </ul>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
