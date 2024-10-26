import React from "react";
import { Player } from "../types";
import PlayerCard from "./PlayerCard";

interface FieldViewProps {
  picks: Array<{
    element: number;
    position: number;
    is_captain: boolean;
    is_vice_captain: boolean;
    multiplier: number;
  }>;
  players: Player[];
  currentWeekPoints: number;
}

const FieldView: React.FC<FieldViewProps> = ({
  picks,
  players,
  currentWeekPoints,
}) => {
  const getPlayerById = (id: number) => players.find((p) => p.id === id);

  // Separate starting 11 and bench players
  const startingPlayers = picks.filter((pick) => pick.position <= 11);
  const benchPlayers = picks.filter((pick) => pick.position > 11);

  // Group starting players by position
  const groupedPlayers = startingPlayers.reduce((acc, pick) => {
    const player = getPlayerById(pick.element);
    if (player) {
      const position = player.element_type;
      if (!acc[position]) acc[position] = [];
      acc[position].push({ ...player, ...pick });
    }
    return acc;
  }, {} as Record<number, Array<Player & { is_captain: boolean; is_vice_captain: boolean }>>);

  return (
    <div className="space-y-4">
      {/* Current Week Points */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center">
        <h2 className="text-2xl font-bold text-white">Current Week Points</h2>
        <p className="text-4xl font-bold text-green-400">{currentWeekPoints}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-3/4">
          <div className="relative w-full" style={{ paddingBottom: "120%" }}>
            <div className="absolute inset-0 bg-gradient-to-b from-green-700 via-green-600 to-green-800 rounded-2xl overflow-y-auto shadow-2xl">
              {/* Field texture and markings */}
              <div className="absolute inset-0 bg-[url('/grass-texture.png')] opacity-30"></div>
              <div className="absolute inset-0">
                <div className="absolute top-[10%] left-0 right-0 h-px bg-white/50"></div>
                <div className="absolute top-[35%] left-0 right-0 h-px bg-white/50"></div>
                <div className="absolute top-[65%] left-0 right-0 h-px bg-white/50"></div>
                <div className="absolute top-[90%] left-0 right-0 h-px bg-white/50"></div>
                <div className="absolute top-[10%] left-[22%] bottom-[10%] w-px bg-white/50"></div>
                <div className="absolute top-[10%] right-[22%] bottom-[10%] w-px bg-white/50"></div>
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-px h-[15%] bg-white/50"></div>
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-px h-[15%] bg-white/50"></div>
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-white/50 rounded-full"></div>
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-white/50 rounded-full"></div>
              </div>

              {/* Players positioning */}
              <div className="absolute inset-0 flex flex-col">
                {/* Forwards */}
                <div className="flex-1 flex items-center justify-center pt-[10%]">
                  <div className="flex justify-center gap-2 md:gap-4 w-full px-4">
                    {groupedPlayers[4]?.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        isCaptain={player.is_captain}
                        isViceCaptain={player.is_vice_captain}
                      />
                    ))}
                  </div>
                </div>

                {/* Midfielders */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex justify-center flex-wrap gap-2 md:gap-4 w-full px-4">
                    {groupedPlayers[3]?.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        isCaptain={player.is_captain}
                        isViceCaptain={player.is_vice_captain}
                      />
                    ))}
                  </div>
                </div>

                {/* Defenders */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex justify-center flex-wrap gap-2 md:gap-4 w-full px-4">
                    {groupedPlayers[2]?.map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        isCaptain={player.is_captain}
                        isViceCaptain={player.is_vice_captain}
                      />
                    ))}
                  </div>
                </div>

                {/* Goalkeeper */}
                <div className="flex-1 flex items-center justify-center pb-[10%]">
                  {groupedPlayers[1] && groupedPlayers[1].length > 0 && (
                    <PlayerCard
                      player={groupedPlayers[1][0]}
                      isCaptain={groupedPlayers[1][0].is_captain}
                      isViceCaptain={groupedPlayers[1][0].is_vice_captain}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bench players */}
        <div className="w-full md:w-1/4 bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <h3 className="text-xl font-bold text-white mb-4">Bench</h3>
          <div className="space-y-2">
            {benchPlayers.map((pick) => {
              const player = getPlayerById(pick.element);
              if (player) {
                return (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isCaptain={pick.is_captain}
                    isViceCaptain={pick.is_vice_captain}
                    isBench={true}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldView;
