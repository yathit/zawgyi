/* !!! PyBurglish is still in Under Constructions !!! */
/* !!! PyBurglish is still in Under Constructions !!! */
/* !!! PyBurglish is still in Under Constructions !!! */

#include <Python.h>

Py_UNICODE* _Digit2Burmese(char* srcStr)
{
	const Py_UNICODE* _bd[]={L"\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049"};
	Py_ssize_t size;
	Py_UNICODE* destStr;
	
	size = PyUnicode_GET_SIZE(srcStr);
	if (size > (PY_SSIZE_T_MAX-2-1)/6) {
        PyErr_SetString(PyExc_OverflowError,
                        "unicode object is too large to make destStr");
        return NULL;
    }
    
	destStr = PyString_FromStringAndSize(NULL, 2 + 6*size + 1);
    if (destStr == NULL)
        return NULL;
        
    while(*srcStr){
		if(*srcStr>='0' && *srcStr<='9'){
			*destStr=_bd[*srcStr-'0'];
		}else{
			*destStr=*srcStr;
		}
		destStr++;
		srcStr++;
	}
	*destStr=NULL;
	return destStr;
}
 
static PyObject* Digit2Burmese(PyObject* self, PyObject* args)
{
    const char *s;
 
    if (!PyArg_ParseTuple(args, "s", &s))
        return NULL;
	
    //return Py_BuildValue("u", _Digit2Burmese(s));
    return Py_BuildValue("u", L"\u1040\u1041\u1042\u1043\u1044\u1045\u1046\u1047\u1048\u1049");
}
 
static PyMethodDef BurglishMethods[] = {
    {"Digit2Burmese", Digit2Burmese, METH_VARARGS, "Python Implementation for Burglish Systems."},
    {NULL, NULL, 0, NULL}
};
 
PyMODINIT_FUNC
initBurglish(void)
{
    (void) Py_InitModule("Burglish", BurglishMethods);
}
