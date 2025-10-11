import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import type { Achievement } from "../app/types/achievement";
import { cn } from "@/lib/utils";
import { achievementsData } from "@/lib/data/achievements";

interface AchievementCardProps {
  achievement: Achievement;
}

const firstRow = achievementsData.slice(0, achievementsData.length / 2);
const secondRow = achievementsData.slice(achievementsData.length / 2);

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isLocked = !achievement.unlocked;

  return (
    <Card
      className={cn(
        "w-100 glass-effect transition-all duration-300 relative overflow-hidden",
        isLocked && "opacity-60 grayscale",
        achievement.animation === "pulse" && !isLocked && "animate-pulse",
        achievement.animation === "glow" && !isLocked && "animate-pulse"
      )}
    >
      {isLocked && (
        <div className="absolute top-3 right-3 z-10">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "text-4xl flex-shrink-0 transition-transform duration-300",
              !isLocked && "hover:scale-110"
            )}
            aria-hidden="true"
          >
            {achievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold mb-1 text-balance">
              {achievement.title}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                className={cn("text-xs font-medium", achievement.badgeColor)}
              >
                {achievement.difficultyIcon} {achievement.difficulty}
              </Badge>
              {!isLocked && achievement.unlockedAt && (
                <span className="text-xs text-muted-foreground">
                  Desbloqueado em{" "}
                  {achievement.unlockedAt.toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
          {achievement.description}
        </p>
      </CardContent>
    </Card>
  );
}
