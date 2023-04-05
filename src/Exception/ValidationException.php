<?php

namespace App\Exception;

use Exception;
use JetBrains\PhpStorm\Pure;
use Symfony\Component\Validator\ConstraintViolationListInterface;
use Throwable;

class ValidationException extends Exception
{
    /**
     * @var ConstraintViolationListInterface
     */
    private ConstraintViolationListInterface $errors;

    /**
     * @param ConstraintViolationListInterface $errors
     * @param int $code
     * @param Throwable|null $previous
     */
    #[Pure] public function __construct(ConstraintViolationListInterface $errors, int $code = 0, Throwable $previous = null)
    {
        $this->errors = $errors;

        parent::__construct("An invalid data was provided", $code, $previous);
    }

    /**
     * @return ConstraintViolationListInterface
     */
    public function getErrors(): ConstraintViolationListInterface
    {
        return $this->errors;
    }
}