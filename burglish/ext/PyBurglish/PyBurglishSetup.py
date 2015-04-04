from distutils.core import setup, Extension
 
module1 = Extension('Burglish', sources = ['PyBurglish.c'])
 
setup (name = 'PyBurglish',
        version = '1.0',
        description = 'Python Implementation for Burglish Systems.',
        ext_modules = [module1])
