package com.jcjee.plugins;

import java.io.File;
import java.io.FileNotFoundException;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.content.UriMatcher;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.MediaStore;
import android.webkit.MimeTypeMap;

public class EmailAttachmentProvider extends ContentProvider {
	
	public static final String AUTHORITY = "com.jcjee.plugins.emailcomposer.provider";
	
	private UriMatcher uriMatcher;

	@Override
	public boolean onCreate() {
		uriMatcher = new UriMatcher(UriMatcher.NO_MATCH);
		
		uriMatcher.addURI(AUTHORITY, "*", 1);
		
		return true;
	}
	
	@Override
    public ParcelFileDescriptor openFile(Uri uri, String mode) throws FileNotFoundException { 
		switch(uriMatcher.match(uri)) {
			case 1:
				String fileLocation = getContext().getCacheDir() + File.separator + uri.getLastPathSegment();
				ParcelFileDescriptor pfd = ParcelFileDescriptor.open(new File(fileLocation), ParcelFileDescriptor.MODE_READ_ONLY);
				return pfd;
			default:
				throw new FileNotFoundException("Unsupported uri: " + uri.toString());
		}
	}

	@Override
	public int update(Uri arg0, ContentValues arg1, String arg2, String[] arg3) {
		return 0;
	}

	@Override
	public int delete(Uri arg0, String arg1, String[] arg2) {
		return 0;
	}

	@Override
	public Uri insert(Uri arg0, ContentValues arg1) {
		return null;
	}

	@Override
	public String getType(Uri arg0) {
		String fileExtension = MimeTypeMap.getFileExtensionFromUrl(arg0.getPath());
		String type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(fileExtension);
		
		return type;
	}

	@Override
	public Cursor query(Uri uri, String[] projection, String selection, String[] selectionArgs, String sortOrder) {
		MatrixCursor result = new MatrixCursor(projection);
		Object[] row = new Object[projection.length];
		long fileSize = 0;
		
		String fileLocation = getContext().getCacheDir() + File.separator + uri.getLastPathSegment();
		File tempFile = new File(fileLocation);
		fileSize = tempFile.length();
		
		for (int i=0; i<projection.length; i++) {
			if (projection[i].compareToIgnoreCase(MediaStore.MediaColumns.DISPLAY_NAME) == 0) {
				row[i] = uri.getLastPathSegment();
			} else if (projection[i].compareToIgnoreCase(MediaStore.MediaColumns.SIZE) == 0) {
				row[i] = fileSize;
			}
		}
		
		result.addRow(row);
		return result;
	}

}
