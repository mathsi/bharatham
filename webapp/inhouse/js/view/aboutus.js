define([ 'backbone', 'jquery', 'underscore', 'app/app',
		'text!template/aboutus.html', 'mustache' ], function(Backbone, $, _,
		App, TemplateAboutUs, Mustache) {

	var NavbarView = Backbone.View.extend({

		el : '#content-wrapper',
		
		events : {
			'click .guru-link': 'changeGuruSection'
		},

		initialize : function(section) {
			this.render(section);
		},

		render : function(section) {
			var self = this;
			$(self.el).html(Mustache.render(TemplateAboutUs, {}));
			$(".aboutus-submenu-item." + section + "-link").addClass("active");

			$.when(App.getAboutUsSectionHtml(section)).done(function(html) {
				console.log(html);
				$(self.el).find(".aboutus-content-area").html(html);
			}).fail(function() {
				alert("Error while loading the content");
			});
			
			if(section === "ourgurus") {
				self.displayGuru("Sathyanarayana");
			}
			
		},
		
		displayGuru: function(guru) {
			$.when(App.getOurGurusSectionHtml(guru)).done(function(html) {
				$(self.el).find(".guru-content").html(html);
			}).fail(function() {
				alert("Error while loading the content");
			});
		},
		
		changeGuruSection: function(ev) {
			var self = this;
			$(ev.currentTarget).closest("ul").find("li.active").removeClass("active");
			$(ev.currentTarget).parent().addClass("active");
			self.displayGuru($(ev.currentTarget).data("guruName"));
		}

	});

	return NavbarView;
});