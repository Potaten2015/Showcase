import json
from app.models import db, Geo

# Adds a demo user, you can add other users here if you want


def seed_geos():

    tatenGeo = Geo(
                 user_id=1,
                 city='Oklahoma City',
                 state='Oklahoma',
                 longitude=-97.5164,
                 latitude=35.4676
                )



    db.session.add_all([tatenGeo])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the geos table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_geos():
    db.session.execute('TRUNCATE geos CASCADE;')
    db.session.commit()
