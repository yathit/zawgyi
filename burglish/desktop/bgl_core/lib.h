#ifndef __LIB_H__
#define __LIB_H__

void cpy(wchar_t* dst, const wchar_t* src);
void sub(wchar_t* dst, const wchar_t* src, const wchar_t* from, wchar_t* to, bool replaceAll=false);
int cmp(const wchar_t* cs, const wchar_t* ct);
int len(const wchar_t* str);

#endif // __LIB_H__
