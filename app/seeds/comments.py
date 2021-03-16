import json
from app.models import db, Comment

# Adds a demo user, you can add other users here if you want


def seed_comments():

    tatenComment = Comment(
                 user_id=1,
                 content='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,',
                 color="white"
                )

    for i in range(20):
        comment = Comment(user_id=1, content=f'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium {i}', color="white")
        db.session.add(comment)

    db.session.add_all([tatenComment])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.commit()
