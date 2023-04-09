<?php

namespace App\Http\Middleware;

use App\Persistence\Entity\User;
use App\Persistence\Enums\UserRole;
use App\Persistence\Repository\UserRepository;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Throwable;

class AuthenticateMiddleware implements MiddlewareInterface
{
    const TOKEN_HEADER = 'Authorization';

    const TOKEN_PREFIX = 'Bearer ';

    /**
     * @var UserRepository
     */
    private UserRepository $userRepository;

    public function __construct(private ?UserRole $role)
    {
        $this->userRepository = new UserRepository();
    }

    /**
     * @param Request $request
     * @param RequestHandler $handler
     * @return Response
     */
    public function process(Request $request, RequestHandler $handler): Response
    {
        $response = new \Slim\Psr7\Response();

        $authorization = $request->getHeaderLine(self::TOKEN_HEADER);

        if (empty($authorization) || !str_starts_with($authorization, self::TOKEN_PREFIX)) {
            return $response->withStatus(401);
        }

        $token = substr($authorization, strlen(self::TOKEN_PREFIX));

        try {
            $payload = JWT::decode($token, new Key(getenv('JWT_SECRET'), getenv('JWT_ALGORITHM')));

            /** @var User $user */
            $user = $this->userRepository->find($payload->user);

            if (empty($user)) {
                return $response->withStatus(401);
            }

            if ($user->getRole() !== $this->role && $this->role !== null) {
                return $response->withStatus(403);
            }
        }
        catch (Throwable $t) {
            return $response->withStatus(401);
        }

        return $handler->handle($request);
    }
}