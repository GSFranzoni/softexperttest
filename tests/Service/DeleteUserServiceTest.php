<?php

namespace Service;

use App\Exception\DomainException;
use App\Exception\ResourceNotFoundException;
use App\Persistence\Entity\User;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;
use App\Service\DeleteUserService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class DeleteUserServiceTest extends TestCase
{
    /**
     * @throws DomainException
     * @throws ResourceNotFoundException
     * @throws Exception
     */
    public function testLoggedUserCantDeleteHimself(): void
    {
        $loggedUserId = 1;
        $id = $loggedUserId;
        $repository = $this->createMock(UserRepository::class);
        $service = new DeleteUserService($repository);
        $this->expectException(DomainException::class);
        $this->expectExceptionMessage("You can't delete yourself");
        $repository->expects($this->never())->method('delete');
        $service->execute($id, $loggedUserId);
    }

    /**
     * @return void
     * @throws DomainException
     * @throws Exception
     * @throws ResourceNotFoundException
     */
    public function testShouldThrowExceptionWhenUserNotFound(): void
    {
        $loggedUserId = 1;
        $id = 2;
        $repository = $this->createMock(UserRepository::class);
        $repository->method('find')->willReturn(null);
        $service = new DeleteUserService($repository);
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage("User not found");
        $repository->expects($this->never())->method('delete');
        $service->execute($id, $loggedUserId);
    }

    /**
     * @return void
     * @throws DomainException
     * @throws Exception
     * @throws ResourceNotFoundException
     */
    public function testShouldThrowExceptionWhenUserIsLastAdmin(): void
    {
        $loggedUserId = 1;
        $id = 2;
        $repository = $this->createMock(UserRepository::class);
        $user = $this->createMock(User::class);
        $user->method('getRole')->willReturn(UserRole::ADMIN);
        $repository->method('find')->willReturn($user);
        $repository->method('count')->willReturn(1);
        $service = new DeleteUserService($repository);
        $this->expectException(DomainException::class);
        $this->expectExceptionMessage("You can't delete the last admin");
        $repository->expects($this->never())->method('delete');
        $service->execute($id, $loggedUserId);
    }

    /**
     * @return void
     * @throws DomainException
     * @throws Exception
     * @throws ResourceNotFoundException
     */
    public function testShouldDeleteUser(): void
    {
        $loggedUserId = 1;
        $id = 2;
        $repository = $this->createMock(UserRepository::class);
        $user = $this->createMock(User::class);
        $user->method('getRole')->willReturn(UserRole::REGULAR);
        $repository->method('find')->willReturn($user);
        $repository->method('count')->willReturn(2);
        $service = new DeleteUserService($repository);
        $repository->expects($this->once())->method('delete');
        $service->execute($id, $loggedUserId);
        $this->assertTrue(true);
    }
}
