from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"),nullable=False )
    content = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(20), nullable=False)
    time_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "content": self.content,
            "color": self.color
        }
