import { Test } from '@nestjs/testing';
import { HealthStatusService } from './health-status.service';
import { HealthStatusRepository } from './health-status.repository';
import { GetHealthStatusFilterDto } from './dto/get-health-status-filter.dto';
import { HealthStatusGender } from './health-status-gender.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username: 'Test user' };

const mockHealthStatusRepository = () => ({
    getHealthStatus: jest.fn(),
    findOne: jest.fn(),
    createHealthStatus: jest.fn(),
    delete: jest.fn(),
});

describe('HealthStatusService', () => {
   let healthStatusService;
   let healthStatusRepository;

   beforeEach(async () => {
    const module = await Test.createTestingModule({
        providers: [
            HealthStatusService,
            { provide: HealthStatusRepository, useFactory: mockHealthStatusRepository }
        ],
    }).compile();

    healthStatusService = await module.get<HealthStatusService>(HealthStatusService);
    healthStatusRepository = await module.get<HealthStatusRepository>(HealthStatusRepository);
   });

   describe('getHealthStatus', () => {
       it('gets all health status from the repository', async () => {
            healthStatusRepository.getHealthStatus.mockResolvedValue('someValue');

            expect(healthStatusRepository.getHealthStatus).not.toHaveBeenCalled();
            const filters: GetHealthStatusFilterDto = { gender: HealthStatusGender.MALE, search: false };
            const result = await healthStatusService.getHealthStatus(filters, mockUser);
            expect(healthStatusRepository.getHealthStatus).toHaveBeenCalled();
            expect(result).toEqual('someValue');
       });
   });
   
   describe('getHealthStatusById', () => {
       it('calls healthStatusRepository.findOne() and successfully retrieve and return the health status', async () => {
           const mockHealthStatus = { cough: true, shortnessOfBreath: false, fever: false };
           healthStatusRepository.findOne.mockResolvedValue(mockHealthStatus);

           const result = await healthStatusService.getHealthStatusById(1, mockUser);
           expect(result).toEqual(mockHealthStatus)

           expect(healthStatusRepository.findOne).toHaveBeenCalledWith({ 
                where: { 
                   id: 1, 
                   userId: mockUser.id
                } 
            })
       });

       it('throws and error as health status is not found', () => {
            healthStatusRepository.findOne.mockResolvedValue(null);
            expect(healthStatusService.getHealthStatusById(1, mockUser)).rejects.toThrow(NotFoundException);
       });
       
   });

   describe('createHealthStatus', () => {
       it('calls healthStatusRepository.create() and returns the result', async () => {
            healthStatusRepository.createHealthStatus.mockResolvedValue('someHealthStatus');

            expect(healthStatusRepository.createHealthStatus).not.toHaveBeenCalled();
            const mockCreateHealthStatusDto = { fever: false, cough: false, shortnessOfBreath: false };
            const result = await healthStatusService.createHealthStatus(mockCreateHealthStatusDto, mockUser);
            expect(healthStatusRepository.createHealthStatus).toHaveBeenCalledWith(mockCreateHealthStatusDto, mockUser);
            expect(result).toEqual('someHealthStatus');
       });
   })

   describe('deleteHealthStatus', () => {
      it('calls healthStatusRepository.deleteHealthStatus() to delete a health status', async () => {
         healthStatusRepository.delete.mockResolvedValue({ affected: 1 });
         expect(healthStatusRepository.delete).not.toHaveBeenCalled();
         await healthStatusService.deleteHealthStatusById(1, mockUser);
         expect(healthStatusRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });
      });
      
      it('throws an error as health status could not be found', () => {
        healthStatusRepository.delete.mockResolvedValue({ affected: 0 });
        expect(healthStatusService.deleteHealthStatusById(1, mockUser)).rejects.toThrow(NotFoundException);
      });
      
   });
   
   describe('updateHealthStatusGenderById', () => {
       const save = jest.fn().mockResolvedValue(true);
       it('updates a health status gender', async () => {
        healthStatusService.getHealthStatusById =  jest.fn().mockResolvedValue({
            gender: HealthStatusGender.MALE,
            save
        });

        expect(healthStatusService.getHealthStatusById).not.toHaveBeenCalled();
        expect(save).not.toHaveBeenCalled()
        const result = await healthStatusService.updateHealthStatusGenderById(1, HealthStatusGender.FEMALE, mockUser);
        expect(healthStatusService.getHealthStatusById).toHaveBeenCalled();
        expect(save).toHaveBeenCalled();
        expect(result.gender).toEqual(HealthStatusGender.FEMALE);
        
    });
       
   });
   
});