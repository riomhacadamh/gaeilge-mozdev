#!/bin/bash
find . -name '*.properties' | egrep '-en-US/' | xargs egrep '^[^#]+=[^#]*\\u0020$' |
while read x
do
	FILENAME=`echo $x | sed 's/:.*//' | sed 's/-en-US/-ga-IE/'`
	KEY=`echo $x | sed 's/^[^:]*://' | sed 's/[ =].*//'`
	sed -i "/^${KEY}/s/  *$/\\\\u0020/" ${FILENAME}
done
find . -name '*.properties' | egrep '-en-US/' | xargs egrep '^[^#=]+= *\\u0020' |
while read x
do
	FILENAME=`echo $x | sed 's/:.*//' | sed 's/-en-US/-ga-IE/'`
	KEY=`echo $x | sed 's/^[^:]*://' | sed 's/[ =].*//'`
	sed -i "/^${KEY}/s/= */=\\\\u0020/" ${FILENAME}
done
