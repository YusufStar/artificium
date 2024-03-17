"use client";

import axios from "axios";

export async function useProject(id: string, all: boolean = true) {
  const key = `/api/organization/project?pid=${id}&all=${all}`;

  const { data } = await axios.get(key);

  return data as any[];
}
