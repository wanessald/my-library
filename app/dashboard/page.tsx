"use client";

import { getDashboardStats } from "@/lib/data/dashboard";
import StatCard from "@/components/StatCard";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ReadingChart } from "@/components/reading-chart";
import { ReadingGoals } from "@/components/reading-goals";
import { PagesReadCard } from "@/components/PagesReadCard";
import { GenreCard } from "@/components/GenreCard";
import { CurrentReadingCard } from "@/components/CurrentReading";
import { booksData } from "@/lib/data/books";
import { AchievementCard } from "@/components/AchievementCard";
import { getAchievements } from "@/lib/data/achievements";
import { Marquee } from "@/components/ui/marquee";

export default function Dashboard() {
  const { stats, pagesRead, genreStats } = getDashboardStats();

  const hasMetrics = stats.some((stat) => stat.value > 0) || pagesRead > 0;

  const currentBook = booksData
    .getAll()
    .find((book) => book.status === "LENDO");

  const achievements = getAchievements();

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                Dashboard de Leitura
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Acompanhe seu progresso e descubra novos insights sobre seus
                hábitos de leitura
              </p>
            </div>
            <Badge
              className="bg-transparent text-primary px-3 py-1 rounded-full flex items-center gap-2 w-fit"
              aria-label={`Data atual: ${currentDate}`}
            >
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time
                className="capitalize text-xs sm:text-sm"
                dateTime={new Date().toISOString()}
              >
                {currentDate}
              </time>{" "}
            </Badge>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              status={stat.status}
              change={stat.change}
            />
          ))}
          <PagesReadCard pagesRead={pagesRead} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <GenreCard
            genre={genreStats.mostReadGenre}
            count={genreStats.genreCount}
          />
          <CurrentReadingCard book={currentBook} isActive={hasMetrics} />
        </div>
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Conquistas</h2>
          <Marquee pauseOnHover className="[--duration:90s]">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </Marquee>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <ReadingChart isActive={hasMetrics} />
          <ReadingGoals isActive={hasMetrics} />
        </div>
      </div>
    </div>
  );
}
