import { Injectable, Logger } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaService } from "../prisma/prisma.service";
import { PrismaError } from "../utils/prismaError";
import { CreateNoteDto } from "./dto/createNote.dto";
import { UpdateNoteDto } from "./dto/updateNote.dto";
import { NoteNotFoundException } from "./exceptions/noteNotFound.exception";

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getNotes() {
    this.logger.log("Getting all notes");
    return this.prismaService.note.findMany();
  }

  async getNoteById(id: number) {
    this.logger.log(`Getting note with id: ${id}`);
    const note = this.prismaService.note.findUnique({ where: { id } });

    if (!note) {
      throw new NoteNotFoundException(id);
    }

    return note;
  }

  async createNote(note: CreateNoteDto) {
    this.logger.log("Creating new note");
    return this.prismaService.note.create({
      data: note
    });
  }

  async updateNote(id: number, note: UpdateNoteDto) {
    this.logger.log("Updating note");
    try {
      return await this.prismaService.note.update({
        data: {
          ...note,
          id: undefined
        },
        where: {
          id
        }
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NoteNotFoundException(id);
      }
      throw error;
    }
  }

  async deleteNote(id: number) {
    this.logger.log("Deleting note");
    try {
      return this.prismaService.note.delete({
        where: {
          id
        }
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NoteNotFoundException(id);
      }
      throw error;
    }
  }
}
