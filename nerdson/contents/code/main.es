/*
 *   Copyright (C) 2009 Rodrigo Chacon <rochacon@gmail.com>
 *
 *   This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU Library General Public License version 2 as
 *   published by the Free Software Foundation
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details
 *
 *   You should have received a copy of the GNU Library General Public
 *   License along with this program; if not, write to the
 *   Free Software Foundation, Inc.,
 *   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

function init()
{
    comic.comicAuthor = "Karlisson Bezerra";
    comic.firstIdentifier = "horario-politico-nerd";
    comic.websiteUrl = "http://nerdson.com/blog/";
   
	if (comic.identifier != new String()) {
		comic.requestPage(comic.websiteUrl + comic.identifier, comic.Page);
	} else {
		comic.requestPage(comic.websiteUrl +"page/1/", comic.User);
	}
}

function pageRetrieved(id, data)
{
	if (id == comic.User) {
		var re = new RegExp("<a href=\"http://nerdson.com/blog/([^\"]+)/\" rel=\"bookmark\" title=\"Permalink para ([^\"]+)\"");
		var match = re.exec(data);
		
		if (match != null) {
			comic.lastIdentifier = match[1];
			comic.requestPage(comic.websiteUrl+match[1], comic.Page);
		} else {
			comic.error();
		}
	}
	if (id == comic.Page) {
		// Get the comic strip
		var img = new RegExp ("http://nerdson.com/images/(\\w+[\\d+]?)/(\\w+\\d+).png");
		var match = img.exec(data);
		
		if (match != null) {
			comic.lastIdentifier = match[1];
			comic.requestPage(match[0], comic.Image);
		} else {
			comic.error();
		}
	
		// Get title 
		var title = new RegExp("<img title=\"([^\"]+)\"");
		match = title.exec(data);
		if (match != null) {
			comic.title = match[1];
		}

		// Get previous identifier
		var prev = new RegExp("<a href=\"http://nerdson.com/blog/([\\w\\d\\-]+)/\" rel=\"prev\"");
		match = prev.exec(data);
		if (match != null) {
			comic.previousIdentifier = match[1];
		}
		
		// Get next identifier
		var next = new RegExp("<a href=\"http://nerdson.com/blog/([\\w\\d\\-]+)/\" rel=\"next\"");
		match = next.exec(data);
		if (match != null) {
			comic.nextIdentifier = match[1];
		}
	}
}

