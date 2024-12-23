import { Task } from "./supabase";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Release New Single: Summer Vibes",
    description: "Final mix review and distribution setup",
    date: new Date(2024, 2, 15, 10).toISOString(),
    color: "#1DB954"
  },
  {
    id: "2",
    title: "Studio Session w/ DJ Fresh",
    description: "Recording vocals with featured artist",
    date: new Date(2024, 2, 15, 14).toISOString(),
    color: "#6E59A5"
  },
  {
    id: "3",
    title: "Marketing Team Sync",
    description: "Campaign planning for Q2",
    date: new Date(2024, 2, 15, 16).toISOString(),
    color: "#2C5282"
  },
  {
    id: "4",
    title: "Playlist Pitch Review",
    description: "Submit to editorial playlists",
    date: new Date(2024, 2, 20, 11).toISOString(),
    color: "#744210"
  },
  {
    id: "5",
    title: "Music Video Production",
    description: "Location: Downtown Studio",
    date: new Date(2024, 2, 15, 9).toISOString(),
    color: "#1DB954"
  },
  {
    id: "6",
    title: "Social Content Creation",
    description: "Create TikTok and Reels",
    date: new Date(2024, 2, 15, 13).toISOString(),
    color: "#6E59A5"
  },
  {
    id: "7",
    title: "Artist Interview - Radio One",
    description: "Live interview session",
    date: new Date(2024, 2, 18, 15).toISOString(),
    color: "#2C5282"
  },
  {
    id: "8",
    title: "Fan Meet & Greet Planning",
    description: "Virtual event setup",
    date: new Date(2024, 2, 15, 11).toISOString(),
    color: "#744210"
  }
]; 