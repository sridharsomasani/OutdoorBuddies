package com.outdoor.buddies.utility;

import java.util.HashMap;

/**
 * @author Sridhar Somasani
 *
 */
public class Constants {
	
	// used in service to map integers to scheduled game
	public static HashMap<Integer, String> gameMap = new HashMap<Integer, String>(){			
		private static final long serialVersionUID = -270389106641328714L;
		{
			put(1, "Football");
			put(2, "Basketball");
			put(3, "Cricket");
			put(4, "Tennis");
		}};
}
