import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InviteParticipantDto } from './dto/invite-participant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Post(':id/invite')
  async inviteParticipant(
    @Param('id') id: string,
    @Body() inviteParticipantDto: InviteParticipantDto,
  ) {
    return this.eventService.inviteParticipant(id, inviteParticipantDto);
  }

  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}