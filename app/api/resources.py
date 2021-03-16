from flask import Blueprint
from app.models import User, Comment, Geo, db
from sqlalchemy.orm import joinedload

resource_routes = Blueprint('resources', __name__)


@resource_routes.route('')
def resources():
    comments = db.session.query(Comment).options(joinedload(Comment.user).joinedload(User.geo)).order_by(Comment.time_created).limit(10).all()

    geos = db.session.query(Geo).options(joinedload(Geo.user)).all()

    edited = {"comments": [], "geos": []}
    for comment in comments:
        newComment = comment.to_dict()
        newComment["user"] = comment.user.to_dict()
        newGeo = comment.user.geo
        newComment["geo"] = comment.user.geo[0].to_dict()
        edited["comments"].append(newComment)

    for geo in geos:
        newGeo = geo.to_dict()
        newGeo["user"] = geo.user.to_dict()
        edited["geos"].append(newGeo)

    return edited
