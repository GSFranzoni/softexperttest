<?php

namespace Service;

use App\DataTransferObject\LoginDTO;
use App\Exception\ResourceNotFoundException;
use App\Exception\UnauthorizationException;
use App\Persistence\Entity\User;
use App\Persistence\Repository\UserRepository;
use App\Service\LoginService;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use PHPUnit\Framework\MockObject\Exception;
use PHPUnit\Framework\TestCase;

class LoginServiceTest extends TestCase
{
    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws UnauthorizationException
     */
    public function testShouldThrowExceptionWhenUserWithGivenEmailNotFound(): void
    {
        $repository = $this->createMock(UserRepository::class);
        $repository->method('findOneBy')->willReturn(null);
        $service = new LoginService($repository);
        $this->expectException(ResourceNotFoundException::class);
        $this->expectExceptionMessage('User not found');
        $input = new LoginDTO(
            'fake@email.com',
            'password'
        );
        $service->execute($input);
    }

    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws UnauthorizationException
     */
    public function testShouldThrowExceptionWhenUserWithGivenEmailAndPasswordFailed(): void
    {
        $repository = $this->createMock(UserRepository::class);
        $user = $this->createMock(User::class);
        $user->method('getPassword')->willReturn(password_hash('password', PASSWORD_DEFAULT));
        $repository->method('findOneBy')->willReturn($user);
        $service = new LoginService($repository);
        $this->expectException(UnauthorizationException::class);
        $this->expectExceptionMessage('Invalid credentials');
        $input = new LoginDTO(
            'fake@email.com',
            'wrong_password'
        );
        $service->execute($input);
    }

    /**
     * @return void
     * @throws Exception
     * @throws ResourceNotFoundException
     * @throws UnauthorizationException
     */
    public function testShouldReturnValidToken(): void
    {
        $repository = $this->createMock(UserRepository::class);
        $user = $this->createMock(User::class);
        $user->method('getPassword')->willReturn(password_hash('password', PASSWORD_DEFAULT));
        $user->method('getId')->willReturn(1);
        $repository->method('findOneBy')->willReturn($user);
        $service = new LoginService($repository);
        $input = new LoginDTO(
            'fake@email.com',
            'password'
        );
        $token = $service->execute($input);
        $this->assertNotEmpty($token);
        $this->assertIsString($token);
        $decoded = JWT::decode($token, new Key(getenv('JWT_SECRET'), getenv('JWT_ALGORITHM')));
        $this->assertNotEmpty($decoded);
        $this->assertIsObject($decoded);
        $this->assertEquals(1, $decoded->user);
    }
}
