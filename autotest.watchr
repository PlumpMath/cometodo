watch( 'test/test_.*\.js' )  {|md| system("./run_tests") }
watch( 'lib/.*\.js' )  {|md| system("./run_tests") }
