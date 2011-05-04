def run_all_tests
  system 'clear'
  system './run_tests'
end


watch( 'test/test_.*\.js' )  {|md| run_all_tests }
watch( 'lib/.*\.js' )  {|md| run_all_tests }

run_all_tests