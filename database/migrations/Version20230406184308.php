<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230406184308 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create product category tax table';
    }

    public function up(Schema $schema): void
    {
        $table = $schema->createTable('product_category_taxes');

        $categories = $schema->getTable('products_category');

        $purchased = $schema->getTable('purchased_products');

        $purchase = $schema->getTable('purchases');

        $table->addColumn('id', 'integer', [
            'autoincrement' => true,
            'notnull' => true,
        ]);

        $table->addColumn('description', 'string', [
            'length' => 255,
            'notnull' => true,
        ]);

        $table->addColumn('percent', 'decimal', [
            'precision' => 10,
            'scale' => 2,
            'notnull' => true,
        ]);

        $table->setPrimaryKey(['id']);

        $table->addUniqueIndex(['description']);

        $table->addIndex(['percent']);

        $categories->addColumn('tax_id', 'integer', [
            'notnull' => false,
        ]);

        $categories->dropColumn('tax');

        $categories->addForeignKeyConstraint($table, ['tax_id'], ['id'], [
            'onUpdate' => 'CASCADE',
            'onDelete' => 'SET NULL',
        ]);

        $purchased->addColumn('tax', 'decimal', [
            'precision' => 10,
            'scale' => 2,
            'notnull' => true,
        ]);

        $purchase->addColumn('tax', 'decimal', [
            'precision' => 10,
            'scale' => 2,
            'notnull' => true,
        ]);
    }

    public function down(Schema $schema): void
    {
        $categories = $schema->getTable('products_category');

        $purchased = $schema->getTable('purchased_products');

        $purchase = $schema->getTable('purchases');

        $categories->dropColumn('tax_id');

        $categories->addColumn('tax', 'decimal', [
            'precision' => 10,
            'scale' => 2,
            'notnull' => true,
        ]);

        $purchased->dropColumn('tax');

        $purchase->dropColumn('tax');

        $schema->dropTable('product_category_taxes');
    }
}
