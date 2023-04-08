<?php

declare(strict_types=1);

namespace App\Migrations;

use App\Persistence\Enums\UserRole;
use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230407230749 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create users table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('users');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => false,
        ]);

        $table->addColumn('name', 'string', [
            'length' => 255,
            'notnull' => false,
        ]);

        $table->addColumn('email', 'string', [
            'length' => 255,
            'notnull' => false,
        ]);

        $table->addColumn('password', 'string', [
            'length' => 255,
            'notnull' => false,
        ]);

        $table->addColumn('role', 'string', [
            'notnull' => false,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addUniqueIndex(['email']);

        $table->addIndex(['role']);
    }

    public function postUp(Schema $schema): void
    {
        if (getenv('ENVIRONMENT') === 'development') {
            $this->connection->insert('users', [
                'name' => 'Admin',
                'email' => 'admin@softexpert.com',
                'password' => password_hash('admin', PASSWORD_DEFAULT), // Todo: it's not a good practice, but it's just a demo
                'role' => UserRole::ADMIN->value,
            ]);
        }
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('users');
    }
}
