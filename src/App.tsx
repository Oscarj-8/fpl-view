import { useState } from "react";
import { Search, Loader2, Trophy, Users } from "lucide-react";
import { Team, Player, Pick } from "./types";
import FieldView from "./components/FieldView";
import { fetchTeamData, fetchPlayers, fetchPicks, fetchLiveData } from "./api";

function App() {
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentWeekPoints, setCurrentWeekPoints] = useState<number>(0);

  const fetchAllData = async () => {
    if (!teamId) {
      setError("Please enter a team ID");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const teamData = await fetchTeamData(teamId);
      const players = await fetchPlayers();
      const picks = await fetchPicks(teamId, teamData.current_event);
      const liveData = await fetchLiveData(teamData.current_event);

      const currentWeekPoints = picks.reduce((total: number, pick: Pick) => {
        const playerLiveData = liveData.find((e) => e.id === pick.element);
        return (
          total +
          (playerLiveData
            ? playerLiveData.stats.total_points * pick.multiplier
            : 0)
        );
      }, 0);

      setTeamData({ ...teamData, picks });
      setPlayers(players);
      setCurrentWeekPoints(currentWeekPoints);
    } catch (err) {
      console.error(err);
      setError(
        "Note: To test this app, first visit https://cors-anywhere.herokuapp.com/corsdemo and request temporary access"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Fantasy Premier League Team Viewer
          </h1>
          <p className="text-xl text-white/80">
            View and analyze your favorite Fantasy Premier League team.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
            <div className="flex gap-4">
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="Enter your team ID"
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white/50 text-lg"
              />
              <button
                onClick={fetchAllData}
                disabled={loading}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 text-lg font-semibold"
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </div>
            {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
          </div>
        </div>

        {teamData && (
          <div className="space-y-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-white">
                    {teamData.name}
                  </h2>
                  <p className="text-xl text-white/80">
                    Manager: {teamData.player_first_name}{" "}
                    {teamData.player_last_name}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    <span className="text-xl text-white/90">
                      Overall Points:{" "}
                      <strong>{teamData.summary_overall_points}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-500" />
                    <span className="text-xl text-white/90">
                      Overall Rank:{" "}
                      <strong>
                        {teamData.summary_overall_rank.toLocaleString()}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <FieldView
                picks={teamData.picks}
                players={players}
                currentWeekPoints={currentWeekPoints}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
