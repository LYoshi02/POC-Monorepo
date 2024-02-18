import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";

import { FindOneParams } from "../utils/findOneParams";
import { NotesService } from "./notes.service";
import { UpdateNoteDto } from "./dto/updateNote.dto";
import { CreateNoteDto } from "./dto/createNote.dto";

@Controller("notes")
@ApiTags("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getNotes() {
    return this.notesService.getNotes();
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    required: true
  })
  getNoteById(@Param() { id }: FindOneParams) {
    return this.notesService.getNoteById(Number(id));
  }

  @Post()
  async createNote(@Body() note: CreateNoteDto) {
    return this.notesService.createNote(note);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    required: true
  })
  async updateNote(
    @Param() { id }: FindOneParams,
    @Body() note: UpdateNoteDto
  ) {
    return this.notesService.updateNote(Number(id), note);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    required: true
  })
  async deleteNote(@Param() { id }: FindOneParams) {
    return this.notesService.deleteNote(Number(id));
  }
}
