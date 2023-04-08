<?php

namespace App\DataTransferObject;

use App\Exception\ValidationException;
use Symfony\Component\Validator\Constraints\NotBlank;

class LoginDTO extends AbstractDTO
{
    #[NotBlank]
    public string $email;

    #[NotBlank]
    public string $password;

    /**
     * @param string $email
     * @param string $password
     * @throws ValidationException
     */
    public function __construct(
        string $email,
        string $password
    ) {
        $this->email = $email;
        $this->password = $password;

        parent::__construct();
    }
}