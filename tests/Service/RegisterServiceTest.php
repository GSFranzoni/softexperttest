<?php

namespace Service;

use App\DataTransferObject\RegisterDTO;
use App\Exception\UserAlreadyExistsException;
use App\Persistence\Entity\User;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;
use App\Service\RegisterService;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class RegisterServiceTest extends TestCase
{
    /*
    public function execute(RegisterDTO $register): void
    {
        $existingUser = $this->repository->findOneBy(['email' => $register->email]);
        if (!empty($existingUser)) {
            throw new UserAlreadyExistsException("User already exists");
        }
        $user = new User();
        $user->setName($register->name);
        $user->setRole($register->role);
        $user->setEmail($register->email);
        $user->setPassword($register->password);
        $this->repository->save($user);
    }
     * */
    /**
     * @return void
     * @throws UserAlreadyExistsException
     * @throws Exception
     */
    public function testShouldThrowExceptionWhenUserWithGivenEmailAlreadyExists(): void
    {
        $repository = $this->createMock(UserRepository::class);
        $repository->method('findOneBy')->willReturn(new User());
        $service = new RegisterService($repository);
        $this->expectException(UserAlreadyExistsException::class);
        $this->expectExceptionMessage('User already exists');
        $input = new RegisterDTO(
            'name',
            'email',
            'password',
            UserRole::ADMIN
        );
        $repository->expects($this->once())->method('findOneBy')->with(['email' => $input->email]);
        $repository->expects($this->never())->method('save');
        $service->execute($input);
    }

    /**
     * @return void
     * @throws UserAlreadyExistsException
     * @throws Exception
     */
    public function testShouldSaveUser(): void
    {
        $repository = $this->createMock(UserRepository::class);
        $repository->method('findOneBy')->willReturn(null);
        $service = new RegisterService($repository);
        $input = new RegisterDTO(
            'name',
            'email',
            'password',
            UserRole::ADMIN
        );
        $repository->expects($this->once())->method('findOneBy')->with(['email' => $input->email]);
        $repository->expects($this->once())->method('save');
        $service->execute($input);
    }
}
