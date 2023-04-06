<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230405181159 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create purchases table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('purchases');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => true,
        ]);

        $table->addColumn('total', 'float', [
            'notnull' => true,
        ]);

        $table->addColumn('created_at', 'datetime', [
            'notnull' => true,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addIndex(['created_at']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('purchases');
    }
}
