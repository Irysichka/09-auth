
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type UpdateMeRequest = {
  username?: string;
};

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const fetchNotes = async (
  page: number,
  query: string,
  tag?: string
): Promise<NoteResponse> => {
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      page: page,
      perPage: 12,
      search: query,
      tag: tag,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};
