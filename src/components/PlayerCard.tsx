import React from "react";
import { Trophy, Star, Shirt } from "lucide-react";
import { Player } from "../types";

interface PlayerCardProps {
  player: Player;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isBench?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCaptain,
  isViceCaptain,
  isBench,
}) => {
  const positionColors: { [key: number]: string } = {
    1: "from-yellow-400 to-yellow-600", // GK
    2: "from-blue-400 to-blue-600", // DEF
    3: "from-green-400 to-green-600", // MID
    4: "from-red-400 to-red-600", // FWD
  };

  const positionNames: { [key: number]: string } = {
    1: "GK",
    2: "DEF",
    3: "MID",
    4: "FWD",
  };

  return (
    <div
      className={`relative bg-gradient-to-br ${
        positionColors[player.element_type]
      } rounded-lg shadow-lg p-4 min-w-[8em] mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] ${
        isBench ? "opacity-75" : ""
      }`}
      style={{ width: isBench ? "100%" : "150px" }}
    >
      {(isCaptain || isViceCaptain) && (
        <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg">
          {isCaptain ? (
            <Trophy className="w-4 h-4 text-yellow-500" />
          ) : (
            <Star className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-bold text-white truncate mb-1">
          {player.web_name}
        </span>
        <Shirt className={`w-5 h-5  text-white `} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/90">Position:</span>
        <div className="text-xs text-white/90">
          {positionNames[player.element_type]}
        </div>
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/90">This GW:</span>
          <span className="text-sm font-bold text-white">
            {player.event_points}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/90">Price:</span>
          <span className="text-sm font-bold text-white">
            £{(player.now_cost / 10).toFixed(1)}m
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
