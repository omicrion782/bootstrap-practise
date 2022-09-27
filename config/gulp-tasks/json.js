export const json = () => {
	return app.gulp.src(app.path.src.json)
		// .pipe(app.plugins.plumber(
		// 	app.plugins.notify.onError({
		// 		title: "JSON",
		// 		message: "Error: <%= error.message %>"
		// 	}))
		// )
		// .pipe(webpack(
		// 	{
		// 		watch: true,
		// 	}
		// ))
		.pipe(app.gulp.dest(app.path.build.json));
}