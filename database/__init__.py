from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


engine = create_engine('postgresql:///mimas')
DBSession = sessionmaker(bind=engine)
session = DBSession()
