"""Added house section and number to invoices table

Revision ID: 2dd3c5f508bb
Revises: 
Create Date: 2024-06-14 22:17:55.386891

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2dd3c5f508bb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invoice_entries', schema=None) as batch_op:
        batch_op.add_column(sa.Column('house_section', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('house_number', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('invoice_entries', schema=None) as batch_op:
        batch_op.drop_column('house_number')
        batch_op.drop_column('house_section')

    # ### end Alembic commands ###
