from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    content = StringField('content',
                           validators=[DataRequired()])
    color = StringField('password', validators=[DataRequired()])
    user_id = StringField('user_id', validators=[DataRequired()])
