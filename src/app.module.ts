import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { HostelModule } from './hostel/hostel.module';
import { StaffModule } from './staff/staff.module';
import { ResidentModule } from './resident/resident.module';
import { FeeModule } from './fee/fee.module';
import { ComplaintModule } from './complaint/complaint.module';
import { LeaveModule } from './leave/leave.module';
import { VisitorModule } from './visitor/visitor.module';
import { EmergencyModule } from './emergency/emergency.module';
import { HostelTimingModule } from './hostel-timing/hostel-timing.module';
import { FacilityModule } from './facility/facility.module';
import { FoodMenuModule } from './food-menu/food-menu.module';
import { AuthModule } from './auth/auth.module';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { FloorsModule } from './floor/floor.module';
import { RoomsModule } from './room/room.module';
import { BedsModule } from './bed/bed.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    HostelModule,
    StaffModule,
    FloorsModule,
   BedsModule,
    RoomsModule,
    ResidentModule,
    FeeModule,
    ComplaintModule,
    LeaveModule,
    VisitorModule,
    EmergencyModule,
    HostelTimingModule,
    FacilityModule,
    FoodMenuModule,
    AuthModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaymentService], // Only AppService is needed here
})
export class AppModule {}
