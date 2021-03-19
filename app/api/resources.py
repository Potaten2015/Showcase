from flask import Blueprint, request
from app.models import User, Comment, Geo, db
from sqlalchemy.orm import joinedload
from app.forms import CommentForm

resource_routes = Blueprint('resources', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@resource_routes.route('')
def resources():
    comments = db.session.query(Comment).options(joinedload(Comment.user).joinedload(User.geo)).order_by(Comment.time_created.desc()).limit(10).all()

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

@resource_routes.route('/comment', methods=["POST"])
def new_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment()
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        db.session.flush()

        comments = db.session.query(Comment).options(joinedload(Comment.user).joinedload(User.geo)).order_by(Comment.time_created.desc()).limit(10).all()

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
        print("THE EDITED STUFF THAT NEEDS TO BE PUT INTO THE STORE", edited)
        return edited
    return {'errors': validation_errors_to_error_messages(form.errors)}
