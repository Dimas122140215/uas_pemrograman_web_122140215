from setuptools import setup, find_packages

setup(
    name='BE_MediaTrack',
    version='0.1',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'pyramid',
        'waitress',
        'sqlalchemy',
        'psycopg2-binary',
        'passlib',
        'python-jose',
        'marshmallow',
        'alembic'
    ],
    entry_points="""
    [paste.app_factory]
    main = BE_MediaTrack:main
    """,
)