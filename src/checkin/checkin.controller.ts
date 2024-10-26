import { Controller, Post, Body, Param, Get, Delete, Patch } from '@nestjs/common';
import { CheckInService } from './checkin.service';
import { CreateCheckInDto } from './dto/create-checkin.dto';

@Controller('checkin')
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  checkIn(@Body() createCheckInDto: CreateCheckInDto) {
    return this.checkInService.checkIn(createCheckInDto);
  }

  @Post(':id/checkout')
  checkOut(@Param('id') checkInId: string) {
    return this.checkInService.checkOut(checkInId);
  }

  @Get('event/:eventId')
  getAllForEvent(@Param('eventId') eventId: string) {
    return this.checkInService.findAllForEvent(eventId);
  }

  @Delete(':id')
  deleteCheckIn(@Param('id') checkInId: string) {
    return this.checkInService.deleteCheckIn(checkInId);
  }

  // PATCH 메서드로 체크인 수정 엔드포인트 추가
  @Patch(':id')
  updateCheckIn(@Param('id') checkInId: string, @Body() updateData: any) {
    return this.checkInService.updateCheckIn(checkInId, updateData);
  }
}