$(function(){
	var init = function(){

		bindEvent.init();
		config.init();
		render.init();

		//exposure interface
		Render = render;

	},

	asyn = {

	},

	render = {

		init : function(){
			this.initEditor();
		},

		initEditor : function(){
			var wh = window.innerHeight,
				wrap = $('.site-wrap');
			this.togglePanel('folder-wrap',false);
			this.togglePanel('file-wrap',false);
			this.togglePanel('textarea-wrap',true);
			this.togglePanel('render-area',true);
		},

		togglePanel : function(panelName,isVisible){
			var ww = window.innerWidth,
				ratio,
				panel = $('.site-wrap .' + panelName),
				currentState = panel.is('.folded');

			//if the panel has been visible/invisible,return
			// if((currentState && !isVisible) || (!currentState && isVisible))
			// 	return;

			isVisible?panel.removeClass('folded'):panel.addClass('folded');
			this.fixedPanelWidth();

			if(panelName === 'folder-wrap' || panelName === 'file-wrap'){
				ratio = isVisible?0.2:0.05;
			}
			else
				ratio = isVisible?0.4:0.05;
			panel.css('width',ww*ratio);
		},

		fixedPanelWidth : function(){
			var w = ctrl.getW(),
				wrap = $('.site-wrap');
			if(w<8){
				//small
				wrap.css('width','100%');
			}
			else if(w < 10){
				//medium
				wrap.css('width','110%');
			}
			else{
				//large
				wrap.css('width','130%');
			}
		},


		fillEditPanelAndRenderArea : function(text){
			//fill the panel
			$('#edit-area').val(text);
			$('#markdown').html(config.md.render(text));

			//show the render-panel at least,the user want to checkout the document at most time
			this.togglePanel('render-area',true);
		},




	},

	bindEvent = {
		init : function(){
			this.editAreaEvent();
			this.togglePanel();
		},

		editAreaEvent : function(){
			var editArea = $('#edit-area'),
				textBreakInterval,
				displayArea = $('#markdown');

			function textBreak(){
				displayArea.html(config.md.render(editArea.val()));
			}

			$(document).on('click','.auto-render-btn',function(){
				var that = $(this);
				if(that.is('.active')){
					that.removeClass('active');
					//unbind auto render
					editArea.unbind('keyup');
				}
				else{
					that.addClass('active');

					textBreak();
					render.togglePanel('render-area',true);

					//auto render the document
					editArea.keyup(function(){
						clearTimeout(textBreakInterval);
						textBreakInterval = setTimeout(textBreak,500);
					});
				}
			});

			$(document).on('click','.render-btn',function(){
				textBreak();
				render.togglePanel('render-area',true);
			});
		},

		togglePanel : function(){
			$(document).on('click','.toggle-panel-btn',function(){
				var panel = $(this).parents('.panel'),
					name = panel.attr('name'),
					isVisible;
				if(panel.is('.folded')){
					panel.removeClass('folded');
					isVisible = true;
				}
				else{
					panel.addClass('folded');
					isVisible = false;
				}
				render.togglePanel(name,isVisible);
			});

			$(document).on('click','.panel .close',function(){
				var panel = $(this).parents('.panel'),
					name = panel.attr('name');
					panel.addClass('folded');
					render.togglePanel(name,false);
			});
		},





	},

	ctrl = {

		init : function(){

		},

		getW : function(){
			var wraps = $('.site-wrap>div:not(.folded)'),
				w = 0;
			for(var i = 0;i<wraps.length;i++)
				w += wraps.eq(i).index()+1;
			return w;
		},


	},

	config = {

		togglePanelAnimateSpeed : 500,

		md : null,

		init : function(){

			//var Remarkable = require('remarkable');
			//var hljs       = require('highlight.js') // https://highlightjs.org/

			this.md = new Remarkable('full', {
			  html:         false,        // Enable HTML tags in source
			  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
			  breaks:       false,        // Convert '\n' in paragraphs into <br>
			  langPrefix:   'language-',  // CSS language prefix for fenced blocks
			  linkify:      true,         // autoconvert URL-like texts to links

			  // Enable some language-neutral replacements + quotes beautification
			  typographer:  false,

			  // Double + single quotes replacement pairs, when typographer enabled,
			  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
			  quotes: '“”‘’',

			  // Highlighter function. Should return escaped HTML,
			  // or '' if input not changed
			  highlight: function (str, lang) {
			    if (lang && hljs.getLanguage(lang)) {
			      try {
			        return hljs.highlight(lang, str).value;
			      } catch (__) {}
			    }

			    try {
			      return hljs.highlightAuto(str).value;
			    } catch (__) {}

			    return ''; // use external default escaping
			  }
			});
		},




	};

	init();

});