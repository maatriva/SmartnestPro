import { useMemo, useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

function Choice({ value, active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={[
        "px-4 py-2 rounded-2xl border text-sm transition-all",
        active
          ? "border-purple-300 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
          : "border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function TechAcceptBuyForm() {
  const [submitted, setSubmitted] = useState(false);

  const [answers, setAnswers] = useState({
    // section1
    aiCurious: "maybe",
    wantsMonitoring: "maybe",
    prefersAutomation: "maybe",
    // section2
    comfortableAtNight: "maybe",
    trustLevel: "maybe",
    // section3
    wouldBuy: "maybe",
    wouldPay: "maybe"
  });

  const priceOptions = useMemo(() => ["$599", "$899", "$1299", "Not sure"], []);

  function update(key) {
    return (value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    setSubmitted(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitted(false);
      console.log("TechAcceptBuyForm submit:", answers);
    }, 2500);
  }

  return (
    <section id="form-tech-root" className="py-24 px-6 bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-black/5 backdrop-blur rounded-full text-purple-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Quick Survey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Help us shape Smart Nest Pro
          </h2>
          <p className="text-xl text-gray-600">
            Three short sections: your tech involvement, acceptability, and whether you would buy.
          </p>
        </div>

        <form onSubmit={submit} className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div id="form-tech" className="form-section1 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold mb-3">
                    1
                    <span>Tech Involvement</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Would you enjoy using AI features?
                  </h3>
                  <p className="text-gray-600">
                    Choose the closest option for each question.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-gray-900 font-medium mb-3">How curious are you about AI monitoring?</div>
                  <div className="flex flex-wrap gap-3">
                    {["Yes", "Maybe", "Not really"].map((label) => (
                      <Choice
                        key={label}
                        label={label}
                        value={label.toLowerCase().includes("yes") ? "yes" : label.toLowerCase().includes("maybe") ? "maybe" : "no"}
                        active={answers.aiCurious === (label.toLowerCase().includes("yes") ? "yes" : label.toLowerCase().includes("maybe") ? "maybe" : "no")}
                        onClick={update("aiCurious")}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-3">Would you want alerts/patterns on sleep & health?</div>
                  <div className="flex flex-wrap gap-3">
                    {["Yes", "Maybe", "Not sure"].map((label) => {
                      const value = label === "Yes" ? "yes" : label === "Maybe" ? "maybe" : "not_sure";
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.wantsMonitoring === value}
                          onClick={update("wantsMonitoring")}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-3">Would you prefer automation over manual soothing?</div>
                  <div className="flex flex-wrap gap-3">
                    {["Yes", "Maybe", "No"].map((label) => {
                      const value = label === "Yes" ? "yes" : label === "Maybe" ? "maybe" : "no";
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.prefersAutomation === value}
                          onClick={update("prefersAutomation")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div id="form-acceptability" className="form-section2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-full text-sm font-semibold mb-3">
                    2
                    <span>Acceptability</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    Is this comfortable to use at home?
                  </h3>
                  <p className="text-gray-600">Pick what feels most accurate.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-gray-900 font-medium mb-3">Would you feel comfortable using it overnight?</div>
                  <div className="flex flex-wrap gap-3">
                    {["Yes", "Maybe", "Not sure"].map((label) => {
                      const value = label === "Yes" ? "yes" : label === "Maybe" ? "maybe" : "not_sure";
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.comfortableAtNight === value}
                          onClick={update("comfortableAtNight")}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-3">How much do you trust the insights?</div>
                  <div className="flex flex-wrap gap-3">
                    {["High", "Medium", "Low"].map((label) => {
                      const value = label === "High" ? "yes" : label === "Medium" ? "maybe" : "no";
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.trustLevel === value}
                          onClick={update("trustLevel")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div id="form-buy" className="form-section3 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-3">
                    3
                    <span>Would You Buy</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    What’s your purchase intent?
                  </h3>
                  <p className="text-gray-600">This helps us validate pricing and features.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-gray-900 font-medium mb-3">Would you buy Smart Nest Pro?</div>
                  <div className="flex flex-wrap gap-3">
                    {["Yes", "Maybe", "No"].map((label) => {
                      const value = label === "Yes" ? "yes" : label === "Maybe" ? "maybe" : "no";
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.wouldBuy === value}
                          onClick={update("wouldBuy")}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-gray-900 font-medium mb-3">Which price feels most reasonable?</div>
                  <div className="flex flex-wrap gap-3">
                    {priceOptions.map((label) => {
                      const value = label;
                      return (
                        <Choice
                          key={label}
                          label={label}
                          value={value}
                          active={answers.wouldPay === value}
                          onClick={update("wouldPay")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 justify-between">
              <div className="text-sm text-gray-600 leading-relaxed">
                Submitting this only stores responses locally in this demo.
              </div>
              <button
                type="submit"
                className="px-8 py-4 rounded-full font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {submitted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Submitted
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <span className="text-white/70">(demo)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

