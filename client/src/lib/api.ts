"use client";

import axios from "axios";

export async function useProject(id: string, all: boolean = true, onSet?: (data: any[]) => void) {
  const key = `/api/organization/project?pid=${id}&all=${all}`;

  const { data } = await axios.get(key);

  if (onSet) {
    onSet(data as any[]);
  }

  return data as any[];
}

export async function useMessages(room: string, onSet: (data: any[]) => void) {
  const key = `/api/organization/messages?room=${room}`;

  const { data } = await axios.get(key);

  if (onSet) {
    onSet(data as any[]);
  }

  return data as any[];
}
