<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230405181348 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create purchased products table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('purchased_products');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => true,
        ]);

        $table->addColumn('product_id', 'integer', [
            'notnull' => true,
        ]);

        $table->addColumn('purchase_id', 'integer', [
            'notnull' => true,
        ]);

        $table->addColumn('quantity', 'integer', [
            'notnull' => true,
        ]);

        $table->addColumn('price', 'float', [
            'notnull' => true,
        ]);

        $table->addColumn('total', 'float', [
            'notnull' => true,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addIndex(['product_id']);

        $table->addIndex(['purchase_id']);

        $table->addIndex(['quantity']);

        $table->addIndex(['price']);

        $table->addIndex(['total']);

        $table->addForeignKeyConstraint('products', ['product_id'], ['id']);

        $table->addForeignKeyConstraint('purchases', ['purchase_id'], ['id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('purchased_products');
    }
}
