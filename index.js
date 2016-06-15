/**
 * @copyright   2010-2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */


require.config({
	paths: {
		'jquery': '//code.jquery.com/jquery-3.0.0.min',
		'skeletor.core': '../Skeletor.core/skeletor.core',
	}
})

define(['jquery', 'skeletor.core'],function ($, Skeletor){
	console.log(Skeletor)
});
