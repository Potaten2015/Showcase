
from .db import db

class Geo(db.Model):
    __tablename__ = 'geos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate="CASCADE", ondelete="CASCADE"), nullable=False, unique=True)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100), nullable=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

    user=db.relationship("User", back_populates="geo")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "city": self.city,
            "state": self.state,
            "company": self.company,
            "latitude": self.latitude,
            "longitude": self.longitude
        }
